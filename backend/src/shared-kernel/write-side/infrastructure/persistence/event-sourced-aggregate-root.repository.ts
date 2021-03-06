import { AbstractAggregateRoot } from '../../domain/abstract-aggregate-root';
import { AggregateId } from '../../domain/aggregate-id.valueobject';
import { AggregateRootRepository } from '../../domain/aggregate-root.repository';
import { DomainEvent } from '../../domain/domain-event';
import { EventStorage } from '@coders-board-library/event-sourcing/api/event-storage';
import { StorageEventEntry } from '@coders-board-library/event-sourcing/api/storage-event-entry';
import { TimeProviderPort } from '../../domain/time-provider.port';
import { EventStreamName } from '@coders-board-library/event-sourcing/api/event-stream-name.valueboject';
import { EventStreamVersion } from '@coders-board-library/event-sourcing/api/event-stream-version.valueobject';
import { DomainEventPublisher } from '../domain-event-publisher/domain-event-publisher';
import { errorCausedBy } from '@coders-board-library/event-sourcing/common/extension-method/error';

export abstract class EventSourcedAggregateRootRepository<I extends AggregateId, T extends AbstractAggregateRoot<I>>
  implements AggregateRootRepository<I, T> {
  protected abstract aggregateType: string;

  protected constructor(
    protected readonly timeProvider: TimeProviderPort,
    private readonly eventStorage: EventStorage,
    private readonly domainEventPublisher: DomainEventPublisher,
  ) {}

  async findById(id: I): Promise<T | null> {
    const events = await this.eventStorage.readEvents(
      EventStreamName.props({
        streamId: id.raw,
        streamGroup: this.aggregateType,
      }),
    );
    if (events.length === 0) {
      return Promise.resolve(null);
    }
    const aggregate = this.newAggregate();
    aggregate.loadFromHistory(events.map(this.recreateEventFromStorage));
    return Promise.resolve(aggregate);
  }

  protected abstract newAggregate(): T;

  protected abstract recreateEventFromStorage(event: StorageEventEntry): DomainEvent;

  save(aggregate: T): Promise<void> {
    const uncommitedEvents = aggregate
      .getUncommittedEvents()
      .map(it => EventSourcedAggregateRootRepository.toStorageDomainEventEntry(it as DomainEvent));
    return this.eventStorage
      .storeAll(
        EventStreamName.props({
          streamId: aggregate.aggregateId.raw,
          streamGroup: this.aggregateType,
        }),
        uncommitedEvents,
        EventStreamVersion.exactly(aggregate.committedVersion.raw),
      )
      .then(() => this.domainEventPublisher.publishAll(aggregate.getUncommittedEvents()))
      .then(() => aggregate.clearUncommittedEvents())
      .catch(e => Promise.reject(errorCausedBy(new Error('Cannot save aggregate in EventStorage!'), e)));
  }

  private static toStorageDomainEventEntry(event: DomainEvent): StorageEventEntry {
    return {
      eventId: event.eventId.raw,
      streamId: event.aggregateId.raw,
      streamGroup: event.aggregateType,
      occurredAt: event.occurredAt,
      eventType: event.eventType,
      data: event.data,
    };
  }
}

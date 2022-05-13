package com.sbegaudeau.spring.services;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Sinks;
import reactor.core.publisher.Sinks.Many;

@Service
public class EventService implements IEventService {
	
	private final List<Event> createdEvents = new ArrayList<>();
	
	private final Many<Event> sink = Sinks.many().multicast().directBestEffort();
	
	@Override
	public Mono<List<Event>> getEvents() {
		return Mono.just(this.createdEvents);
	}

	@Override
	public Mono<Event> createEvent(String name) {
		var event = new Event(name, OffsetDateTime.now());
		this.createdEvents.add(event);
		if (this.sink.currentSubscriberCount() > 0) {			
			this.sink.tryEmitNext(event);
		}
		return Mono.just(event);
	}

	@Override
	public Flux<Event> getEventFlux() {
		return Flux.concat(Flux.fromIterable(this.createdEvents), sink.asFlux());
	}

}

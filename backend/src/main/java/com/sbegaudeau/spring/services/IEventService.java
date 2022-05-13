package com.sbegaudeau.spring.services;

import java.util.List;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface IEventService {
	Mono<List<Event>> getEvents();

	Mono<Event> createEvent(String name);
	
	Flux<Event> getEventFlux();
}

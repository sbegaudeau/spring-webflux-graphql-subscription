package com.sbegaudeau.spring.datafetchers;

import java.util.List;

import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsQuery;
import com.sbegaudeau.spring.services.Event;
import com.sbegaudeau.spring.services.IEventService;

import reactor.core.publisher.Mono;

@DgsComponent
public class QueryEventsDataFetcher {
	private final IEventService eventService;
	
	public QueryEventsDataFetcher(IEventService eventService) {
		this.eventService = eventService;
	}
	
	@DgsQuery
	public Mono<List<Event>> events() {
		return this.eventService.getEvents();
	}
}

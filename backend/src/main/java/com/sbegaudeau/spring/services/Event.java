package com.sbegaudeau.spring.services;

import java.time.OffsetDateTime;

public record Event(String name, OffsetDateTime createdOn) {}

package com.example.application.endpoints;

import java.util.List;
import com.example.application.entity.Todo;
import com.example.application.repository.TodoRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint
@AnonymousAllowed
public class TodoEndpoint {
    private TodoRepository todoRepository;

    public TodoEndpoint(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    /**
     * Using the @Nonnull annotation ensures that the
     * TypeScript generator does not interpret these
     * values as possibly undefined
     * 
     * @return
     */

    public @Nonnull List<@Nonnull Todo> findAll() {
        return todoRepository.findAll();
    }

    public Todo save(Todo todo) {
        return todoRepository.save(todo);
    }

    public void delete(Todo todo) {
        todoRepository.delete(todo);
    }
}

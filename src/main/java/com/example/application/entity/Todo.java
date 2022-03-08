package com.example.application.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Entity
public class Todo {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String task;

    private boolean isCompleted = false;

    public Todo() {
    }

    public Todo(String task) {
        this.task = task;
    }

    public Long getId() {
        return id;
    }

    public String getTask() {
        return task;
    }

    public boolean getIsCompleted() {
        return isCompleted;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setIsCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public void setTask(String task) {
        this.task = task;
    }
}

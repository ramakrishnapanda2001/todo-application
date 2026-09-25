package com.example.todo_backend.repository;
import com.example.todo_backend.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository 
public interface TodoRepository extends JpaRepository<Todo, Long> { 

}

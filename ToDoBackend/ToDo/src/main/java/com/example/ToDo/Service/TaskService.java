package com.example.ToDo.Service;

import com.example.ToDo.Exception.TaskNotFoundException;
import com.example.ToDo.Model.Task;
import com.example.ToDo.Repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    TaskRepository taskRepository;
    public TaskService(TaskRepository taskRepository){
        this.taskRepository=taskRepository;
    }
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task getTask(int id) {
        Optional<Task> taskOptional= taskRepository.findById(id);
        if(taskOptional.isEmpty()){
            throw new TaskNotFoundException("Invalid Task ID");
        }
        return taskOptional.get();
    }


    public Task updateTask(int id, Task task) {
        Optional<Task> taskOptional= taskRepository.findById(id);
        if(taskOptional.isEmpty()){
            throw new TaskNotFoundException("Invalid Task ID");
        }
        Task oldTask=taskOptional.get();
        oldTask.setDateTime(task.getDateTime());
        oldTask.setOperation(task.getOperation());
        oldTask.setUrgency(task.getUrgency());
        oldTask.setTask(task.getTask());

        return taskRepository.save(oldTask);
    }

    public String deleteTask(int id) {
        Optional<Task> taskOptional= taskRepository.findById(id);
        if(taskOptional.isEmpty()){
            throw new TaskNotFoundException("Invalid Task ID");
        }
        taskRepository.delete(taskOptional.get());
        return "Task deleted successfully!";
    }
}

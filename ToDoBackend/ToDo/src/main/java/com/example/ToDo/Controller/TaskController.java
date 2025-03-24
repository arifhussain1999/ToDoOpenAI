package com.example.ToDo.Controller;

import com.example.ToDo.Model.Task;
import com.example.ToDo.Service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")

public class TaskController {

    @Autowired
    TaskService taskService;

    public TaskController(TaskService taskService){
        this.taskService=taskService;
    }

    @PostMapping("/add")
    public ResponseEntity createTask(@RequestBody Task task){
        if(task==null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(taskService.createTask(task), HttpStatus.CREATED);
    }

    @GetMapping("/get")
    public ResponseEntity getTask(@RequestParam int id){
        try{
            return new ResponseEntity<>(taskService.getTask(id),HttpStatus.ACCEPTED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity updateTask(@RequestParam int id, @RequestBody Task task){
        try{
            return new ResponseEntity<>(taskService.updateTask(id,task),HttpStatus.ACCEPTED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteTask(@RequestParam int id){
        try{
            return new ResponseEntity<>(taskService.deleteTask(id),HttpStatus.ACCEPTED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}

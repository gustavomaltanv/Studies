package com.malta.first_spring_app.controller;

import com.malta.first_spring_app.domain.User;
import com.malta.first_spring_app.service.HelloWorldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hello-world")
public class HelloWorldController {

    @Autowired
    private HelloWorldService helloWorldService;

    /*
    @Autowired
    private BibliotecaExternaExemplo bibliotecaExternaExemplo;
     */

    @GetMapping
    public String helloWorld() {
        return helloWorldService.helloWorld("Pessoa");
    }

    @PostMapping
    public String helloWorlfPost(@RequestBody User body) {
        return "Hello world " + body.getName();
    }

    @PostMapping("/{id}")
    public String helloWorlfPostVariable(@PathVariable("id") String id, @RequestParam(value = "filter", defaultValue = "default") String filter,@RequestBody User body) {
        return "Hello world " + body.getName() + " - " + id + " (" + filter + ")";
    }
}

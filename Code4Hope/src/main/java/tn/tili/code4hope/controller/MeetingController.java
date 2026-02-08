package tn.tili.code4hope.controller;

import org.springframework.web.bind.annotation.*;
import tn.tili.code4hope.entities.Meeting;
import tn.tili.code4hope.services.MeetingService;

import java.util.List;

@RestController
@RequestMapping("/Code4Hope/meetings")
@CrossOrigin(origins = "http://localhost:4200")
public class MeetingController {

    private final MeetingService service;

    public MeetingController(MeetingService service) {
        this.service = service;
    }

    @GetMapping
    public List<Meeting> getAll() {
        return service.getAllMeetings();
    }

    @GetMapping("/{id}")
    public Meeting getById(@PathVariable String id) {
        return service.getMeetingById(id);
    }

    @PostMapping
    public Meeting create(@RequestBody Meeting meeting) {
        return service.createMeeting(meeting);
    }

    @PutMapping("/{id}")
    public Meeting update(@PathVariable String id, @RequestBody Meeting meeting) {
        return service.updateMeeting(id, meeting);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.deleteMeeting(id);
    }
}

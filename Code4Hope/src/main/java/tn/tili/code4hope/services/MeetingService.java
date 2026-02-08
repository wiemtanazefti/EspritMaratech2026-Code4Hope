package tn.tili.code4hope.services;

import org.springframework.stereotype.Service;
import tn.tili.code4hope.entities.Meeting;
import tn.tili.code4hope.repository.MeetingRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MeetingService {

    private final MeetingRepository repository;

    public MeetingService(MeetingRepository repository) {
        this.repository = repository;
    }

    public List<Meeting> getAllMeetings() {
        return repository.findAll();
    }

    public Meeting getMeetingById(String id) {
        return repository.findById(id).orElse(null);
    }

    public Meeting createMeeting(Meeting meeting) {
        return repository.save(meeting);
    }

    public Meeting updateMeeting(String id, Meeting meeting) {
        Optional<Meeting> existing = repository.findById(id);
        if (existing.isPresent()) {
            Meeting m = existing.get();
            m.setTitle(meeting.getTitle());
            m.setDescription(meeting.getDescription());
            m.setStartTime(meeting.getStartTime());
            m.setEndTime(meeting.getEndTime());
            m.setGoogleEventId(meeting.getGoogleEventId());
            m.setMinutes(meeting.getMinutes());
            return repository.save(m);
        }
        return null;
    }

    public void deleteMeeting(String id) {
        repository.deleteById(id);
    }
}

package tn.tili.code4hope.repository;

import tn.tili.code4hope.entities.Meeting;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MeetingRepository extends MongoRepository<Meeting, String> {}

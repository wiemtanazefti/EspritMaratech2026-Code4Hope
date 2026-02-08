package tn.tili.code4hope.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "meetings")
public class Meeting {

    @Id
    private String id;

    private String title;
    private String description;
    private Date startTime;
    private Date endTime;

    private String googleEventId; // ✅ NOUVEAU - ID de l'événement Google Calendar

    private List<Minutes> minutes;

    // ===== Getters & Setters =====
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    // ✅ NOUVEAU - Getter et Setter pour googleEventId
    public String getGoogleEventId() {
        return googleEventId;
    }

    public void setGoogleEventId(String googleEventId) {
        this.googleEventId = googleEventId;
    }

    public List<Minutes> getMinutes() {
        return minutes;
    }

    public void setMinutes(List<Minutes> minutes) {
        this.minutes = minutes;
    }
}
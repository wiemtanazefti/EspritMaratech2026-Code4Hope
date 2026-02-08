package tn.tili.code4hope.entities;

public class DocumentHistory {
    private Long documentId;
    private String action;
    private String date;

    public DocumentHistory(Long documentId, String action, String date) {
        this.documentId = documentId;
        this.action = action;
        this.date = date;
    }

    public Long getDocumentId() { return documentId; }
    public String getAction() { return action; }
    public String getDate() { return date; }
}

"use strict";

Asc['asc_docs_api'].prototype.asc_addComment = function(AscCommentData) {
  if (true === AscCommon.CollaborativeEditing.Get_GlobalLock()) {
    return;
  }

  if (null == this.WordControl.m_oLogicDocument) {
    return;
  }

  // Комментарий без цитаты позволяем добавить всегда
  if (true !== this.can_AddQuotedComment() || false === this.WordControl.m_oLogicDocument.Document_Is_SelectionLocked(AscCommon.changestype_Paragraph_Content)) {
    var CommentData = new CCommentData();
    CommentData.Read_FromAscCommentData(AscCommentData);

    this.WordControl.m_oLogicDocument.Create_NewHistoryPoint(AscDFH.historydescription_Document_AddComment);
    var Comment = this.WordControl.m_oLogicDocument.Add_Comment(CommentData);
    if (null != Comment) {
      this.sync_AddComment(Comment.Get_Id(), CommentData);
    }

    return Comment.Get_Id();
  }
};
Asc['asc_docs_api'].prototype['asc_addComment'] = Asc['asc_docs_api'].prototype.asc_addComment;
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdNoteAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Buttons from "../../utils/Buttons";
import toast from "react-hot-toast";

const CreateNote = () => {
  const navigate = useNavigate();

  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);

  //에디터의 내용이 바뀌면 그 내용을 에디터 컨텐트에 저장함
  const handleChange = (content, delta, source, editor) => {
    setEditorContent(content);
  };

  //note create handler
  const handleSubmit = async () => {
    if (editorContent.trim().length === 0) {
      return toast.error("내용을 적어주세요");
    }
    try {
      setLoading(true);
      const noteData = { content: editorContent };
      await api.post("/notes", noteData);
      toast.success("노트 작성 성공");
      navigate("/notes"); //전체 노트 페이지로 이동
    } catch (err) {
      toast.error("노트 작성 중 에러");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-74px)] p-10">
      <div className="flex items-center gap-1 pb-5">
        <h1 className="font-montserrat  text-slate-800 sm:text-4xl text-2xl font-semibold ">
          Create New Note
        </h1>
        <MdNoteAlt className="text-slate-700 text-4xl" />
      </div>

      <div className="h-72 sm:mb-20  lg:mb-14 mb-28 ">
        <ReactQuill
          className="h-full "
          value={editorContent}
          onChange={handleChange}
          modules={{
            toolbar: [
              [
                {
                  header: [1, 2, 3, 4, 5, 6],
                },
              ],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              [{ color: [] }],
              ["clean"],
            ],
          }}
        />
      </div>

      <Buttons
        disabled={loading}
        onClickhandler={handleSubmit}
        className="bg-customRed  text-white px-4 py-2 hover:text-slate-300 rounded-sm"
      >
        {loading ? <span>Loading...</span> : " Create Note"}
      </Buttons>
    </div>
  );
};

export default CreateNote;

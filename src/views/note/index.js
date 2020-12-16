import { Row, Skeleton, Tabs } from "antd";
import { useEffect, useState, React } from "react";
import { NoteService } from "../../services";
import Layout from "antd/lib/layout/layout";
import CardNote from "./card";

const ViewNote = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectTab, setSelectTab] = useState("ALL");

  useEffect(() => {
    getNotes();
  }, [selectTab]);

  const { TabPane } = Tabs;

  const getNotes = async () => {
    setIsLoading(true);
    const note = await NoteService.getNotes({
      page: 1,
      limit: 10,
      noteView: selectTab,
      type: "NOTE",
    });
    console.log(note);
    setNotes(note);
    setIsLoading(false);
  };

  const moveNote = async (noteId, noteView) => {
    console.log(noteId);
    const index = notes.findIndex((note) => note.id === noteId);
    console.log(notes[index]);
    const newNotes = [...notes];
    const note = newNotes[index];
    note.isLoading = true;
    setNotes(newNotes);
    await NoteService.moveNote(noteId, { noteView });
    note.isLoading = false;
    setNotes(newNotes);
    getNotes();
  };

  const updateOption = async (noteId, option) => {
    await NoteService.updateOption(noteId, { option });
    getNotes();
  };

  return (
    <Layout>
      <Row>
        <Tabs
          defaultActiveKey="ALL"
          centered
          onChange={(value) => setSelectTab(value)}
          activeKey={selectTab}
        >
          <TabPane tab="ALL NOTE" key="ALL"></TabPane>
          <TabPane tab="ARCHIVE" key="ARCHIVE"></TabPane>
          <TabPane tab="TRASH" key="TRASH"></TabPane>
        </Tabs>

        {isLoading ? (
          <Skeleton active />
        ) : (
          notes.map((note) => {
            return (
              <CardNote
                key={note.id}
                note={note}
                moveNote={moveNote}
                updateOption={updateOption}
              />
            );
          })
        )}
      </Row>
    </Layout>
  );
};

export default ViewNote;

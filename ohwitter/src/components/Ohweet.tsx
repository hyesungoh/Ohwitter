import React, { useState } from "react";
import { dbService } from "FBase";
import { link } from "fs";
import { KeyObject } from "crypto";

interface OhwheetProps {
    ohweetObj: any;
    isOwner: boolean;
}

const Ohweet = ({ ohweetObj, isOwner }: OhwheetProps) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [newText, setNewText] = useState<string>(ohweetObj.text);

    const toggleEdit = () => setIsEdit((prev) => !prev);

    const onDelete = async () => {
        const isOk = window.confirm("Are you sure?");
        if (isOk) {
            await dbService.doc(`ohweets/${ohweetObj.id}`).delete();
        }
    };

    const onUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await dbService.doc(`ohweets/${ohweetObj.id}`).update({
            text: newText,
        });
        setIsEdit(false);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = event;

        setNewText(value);
    };

    return (
        <div>
            {isEdit ? (
                <>
                    <form onSubmit={onUpdate}>
                        <input
                            type="text"
                            placeholder="Edit your Ohweet"
                            value={newText}
                            onChange={onChange}
                            required
                        />
                        <input type="submit" value="Edit" />
                    </form>
                    <button onClick={toggleEdit}>Cancel</button>
                </>
            ) : (
                <h4>{ohweetObj.text}</h4>
            )}

            {isOwner && (
                <>
                    <button onClick={onDelete}>Delete This</button>
                    <button onClick={toggleEdit}>Update This</button>
                </>
            )}
        </div>
    );
};

export default Ohweet;

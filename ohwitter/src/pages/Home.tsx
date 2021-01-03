import React, { useState } from "react";
import { dbService } from "FBase";

const Home = () => {
    const [text, setText] = useState<string>("");

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await dbService.collection("ohweets").add({
            text,
            createdAt: Date.now(),
        });

        setText("");
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = event;

        setText(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={text}
                    onChange={onChange}
                    type="text"
                    placeholder="What's yout mind?"
                    maxLength={120}
                />
                <input type="submit" value="Post It" />
            </form>
        </div>
    );
};

export default Home;

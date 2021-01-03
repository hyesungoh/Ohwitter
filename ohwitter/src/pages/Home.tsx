import React, { useState } from "react";

const Home = () => {
    const [text, setText] = useState<string>("");

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
                />
                <input type="submit" value="Post It" />
            </form>
        </div>
    );
};

export default Home;

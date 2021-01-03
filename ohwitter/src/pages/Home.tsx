import React, { useEffect, useState } from "react";
import { dbService } from "FBase";

const Home = () => {
    const [text, setText] = useState<string>("");
    const [ohweets, setOhweets] = useState<any[]>([]);

    useEffect(() => {
        getOhweets();
    }, []);

    const getOhweets = async () => {
        const data: firebase.default.firestore.QuerySnapshot = await dbService
            .collection("ohweets")
            .get();

        data.forEach(
            (doc: firebase.default.firestore.QueryDocumentSnapshot) => {
                const ohweetObject = {
                    ...doc.data(),
                    id: doc.id,
                };

                setOhweets((prev) => [ohweetObject, ...prev]);
            }
        );
    };

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

            <div>
                {ohweets.map(({ text, id }) => (
                    <div key={id}>
                        <h4>{text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

import React, { useEffect, useState } from "react";
import { dbService, storageService } from "FBase";
import { v4 as uuid } from "uuid";

import Ohweet from "components/Ohweet";

interface HomeProps {
    userObj: firebase.default.User | null;
}

const Home = ({ userObj }: HomeProps) => {
    const [text, setText] = useState<string>("");
    const [ohweets, setOhweets] = useState<any[]>([]);
    const [ohweetFile, setOhwheetFile] = useState<string | null>();

    useEffect(() => {
        // getOhweets();
        dbService.collection("ohweets").onSnapshot((snapshot) => {
            const ohweetsArray = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setOhweets(ohweetsArray);
        });
    }, []);

    // const getOhweets = async () => {
    //     const data: firebase.default.firestore.QuerySnapshot = await dbService
    //         .collection("ohweets")
    //         .get();

    //     data.forEach(
    //         (doc: firebase.default.firestore.QueryDocumentSnapshot) => {
    //             const ohweetObject = {
    //                 ...doc.data(),
    //                 id: doc.id,
    //             };

    //             setOhweets((prev) => [ohweetObject, ...prev]);
    //         }
    //     );
    // };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fileRef = storageService.ref().child(`${userObj?.uid}/${uuid()}`);
        const response = await fileRef.putString(
            ohweetFile as string,
            "data_url"
        );
        console.log(response);

        // await dbService.collection("ohweets").add({
        //     text,
        //     createdAt: Date.now(),
        //     writer: userObj?.uid,
        // });

        // setText("");
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = event;

        setText(value);
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { files },
        } = event;
        const theFile = files?.[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setOhwheetFile(reader.result as string);
        };
        reader.readAsDataURL(theFile as Blob);
    };

    const onClearOhweetFile = () => setOhwheetFile(null);

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
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Post It" />
                {ohweetFile && (
                    <div>
                        <img
                            src={ohweetFile}
                            alt="temp"
                            width="50px"
                            height="50px"
                        />
                        <button onClick={onClearOhweetFile}>Clear</button>
                    </div>
                )}
            </form>

            <div>
                {ohweets.map((ohweet) => (
                    <Ohweet
                        key={ohweet.id}
                        ohweetObj={ohweet}
                        isOwner={ohweet.writer === userObj?.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;

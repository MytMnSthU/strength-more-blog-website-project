import { useRef } from "react";
import ResetButton from "./ResetButton";
import SubmitCommentButton from "./SubmitCommentButton";
import { gql, request } from "graphql-request";



const CommentForm = ({ articleId, fetchAndSetArticles }) => {
    const textRef = useRef(null);
    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);

    const checkEmpty = (target) => {
        return target.trim().length > 0;
    };

    const isEmailFormat = (target) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(target);
    };

    // console.log('valid?',isEmailFormat('aaaa'));

    const postData = async (title, username, email, articleId) => {
        const endpoint = import.meta.env.VITE_API_KEY;

        const createCommentQuery = gql`
            mutation CreateComment(
                $id: ID
                $email: String
                $title: String
                $username: String
            ) {
                createComment(
                    data: {
                        clknsvk8e0s6j01uccy366fql: { connect: { id: $id } }
                        email: $email
                        title: $title
                        username: $username
                    }
                ) {
                    id
                }
            }
        `;

        const publishCommentQuery = gql`
            mutation PublishComment($createdCommentId: ID) {
                publishComment(
                    where: { id: $createdCommentId }
                    to: PUBLISHED
                ) {
                    createdAt
                    id
                    title
                    username
                }
            }
        `;

        const createCommentVariables = {
            email,
            username,
            title,
            id: articleId,
        };

        const { createComment } = await request(
            endpoint,
            createCommentQuery,
            createCommentVariables
        );

        const data = await request(endpoint, publishCommentQuery, {
            createdCommentId: createComment.id,
        });
        // console.log("Comments", data);

        await fetchAndSetArticles();
    };

    const submitFormComment = () => {
        const title = textRef?.current.value;
        const username = nameInputRef?.current.value;
        const email = emailInputRef?.current.value;

        if (checkEmpty(title) && checkEmpty(username) && checkEmpty(email)) {
            if (isEmailFormat(email)) {
                postData(title, username, email, articleId);
            } else {
                alert("Invalid email format");
            }
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                // submitFormComment();
            }}
            className=" grid gap-3"
        >
            <textarea
                ref={textRef}
                rows="4"
                className=" w-full p-2 px-4 text-lg font-bold  rounded-[20px] border-2 border-black  placeholder:font-normal placeholder:text-black"
                placeholder="Some text here..."
            ></textarea>

            <input
                ref={nameInputRef}
                type="text"
                className="w-full p-2  px-4 text-lg font-bold rounded-[15px] border-2 border-black  placeholder:font-normal placeholder:text-black"
                placeholder="Name"
            />

            <input
                ref={emailInputRef}
                type="email"
                className="w-full p-2  px-4 text-lg font-bold rounded-[15px] border-2 border-black  placeholder:font-normal placeholder:text-black"
                placeholder="Email"
            />

            <div className=" flex justify-end gap-5 items-center">
                <ResetButton>Cancel</ResetButton>
                <SubmitCommentButton
                    submitComment={(e) => {
                        e.preventDefault();
                        submitFormComment();
                    }}
                >
                    submit
                </SubmitCommentButton>
            </div>
        </form>
    );
};

export default CommentForm
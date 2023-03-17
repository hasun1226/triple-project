import React from "react";
import { BsEmojiDizzy } from "react-icons/bs";

export default function Error() {
    return (
        <div id="noResult" className="gray">
            <BsEmojiDizzy />
            <p>죄송합니다.
                <br/>
                다시 시도해 주세요.
            </p>
        </div>
    );
}
import React from "react";
import { FiInbox } from "react-icons/fi";

export default function NoResult() {
    return (
        <div id="noResult" className="gray">
            <FiInbox />
            <p>검색어에 맞는 관광지가 없어요.
                <br/>
                다른 검색어로 찾아보세요.
            </p>
        </div>
    );
}
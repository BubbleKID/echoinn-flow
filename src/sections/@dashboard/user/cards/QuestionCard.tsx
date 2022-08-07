import React from "react";
import "./QuestionCard.scss";
// @types
import { UserData } from '../../../../@types/user';
// components
import UserCard from "./UserCard";


type Props = {
  user: UserData;
  openDetailModel: (user: UserData) => void;
  status?: string;
};

const QuestionCard = (props: Props) => {
  const { user, openDetailModel } = props;
  return (
    <div className="question-card" onClick={() => openDetailModel(user)}>
      <UserCard className="question-card__front" key={user.id} user={user} status={props?.status} />
    </div>
  )
};

export default QuestionCard;

const contactCardTmp = `
<li class="card">
  <div class="card__container">
  <img src={{avatar}} alt="" class="card__avatar">
  <div class="card__textContainer">
    <div class="card__name">{{title}}</div>
    <div class="card__message">{{last_message.content}}</div>
  </div>
  <div class="card__infoContainer">
    <div class="card__time">{{last_message.time}}</div>
    <div class="card__unreadMessages">{{{unread_count}}}</div>
  </div>
  <div>{{{deleteChatButton}}}</div>
  </div>
</li>
`;

export default contactCardTmp;

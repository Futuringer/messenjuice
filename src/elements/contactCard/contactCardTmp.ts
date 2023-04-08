const contactCardTmp = `
<li class="card">
<button class="card__container">
<img src={{avatar}} alt="" class="card__avatar">
<div class="card__textContainer">
  <div class="card__name">{{name}}</div>
  <div class="card__message">{{message}}</div>
</div>
<div class="card__infoContainer">
  <div class="card__time">{{time}}</div>
  <div class="card__unreadMessages">{{{messagesCount}}}</div>
</div>
</button>
</li>
`;

export default contactCardTmp;

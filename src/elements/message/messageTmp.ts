const messageTmp = `
{{#if isMyMessage}}
  <div class="message">
    {{#if image}}
    <img src={{image}} alt="" class="message__image">
    {{/if}}
    {{text}}
    <div class="message__time">{{time}}</div>
  </div>
{{else}}
  <div class="message message_notMy">
    {{#if image}}
    <img src={{image}} alt="" class="message__image">
    {{/if}}
    {{text}}
    <div class="message__time">{{time}}</div>
  </div>
{{/if}}
`;

export default messageTmp;

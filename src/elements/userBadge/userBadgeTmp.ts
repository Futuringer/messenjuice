const userBadgeTmp = `
<div class="userBadge__container">
  <img class="userBadge__avatar" src={{avatar}} alt=''>
  <div class="userBadge__name">{{display_name}}</div>
  {{#if canBeDeleted}}
  {{{deleteButton}}}
  {{/if}}
</div>
`;

export default userBadgeTmp;

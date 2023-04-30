const userBadgeTmp = `
<div class="chatUsers__container">
  {{{renderUsers}}}
  {{#if showAddButton}}
  <div class="chatUsers__addUserContainer">
    {{{addUserButton}}}
    <input type="number" name="addUserInput" placeholder="user Id" class='chatUsers__input'>
  </div>
  {{/if}}
</div>
`;

export default userBadgeTmp;

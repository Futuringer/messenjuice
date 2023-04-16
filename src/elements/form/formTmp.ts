const formTmp = `
<form class="form" id="{{formName}}" onsubmit={{onSubmit}}>
  <h1 class="form__header">{{formText}}</h1>

  {{#if singleColumn}}
  <div class="form__inputs-container">
      {{{inputs}}}
  </div>

  {{else}}
    <div class="form__inputs-container form__inputs-container_two-columns">
      {{{inputs}}}
  </div>
  {{/if}}

  {{#if errorText}}
  {{errorText}}
  {{/if}}

  <div class="form__buttons-container">
      {{{buttons}}}
  </div>

  {{#if descriptionText}}
    <p class="form__description">
      {{descriptionText}}
      {{{descriptionLink}}}
    </p>
  {{/if}}
</form>
`;

export default formTmp;

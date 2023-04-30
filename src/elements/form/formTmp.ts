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

      {{#if errorText}}
        <div class="form__status-text form__error-text">{{errorText}}</div>
      {{/if}}

      {{#if successText}}
        <div class="form__status-text form__success-text">{{successText}}</div>
      {{/if}}
  </div>
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

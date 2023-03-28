const inputTmp = `
  <input
    class="input__field {{className}}"
    {{#if isRequired}}
    required=true
    {{/if}}
    name={{name}}
    type={{type}}
    placeholder="{{placeholder}}"
  />
`;

export default inputTmp;
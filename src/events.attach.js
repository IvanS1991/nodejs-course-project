// SHOW CHANGE PASS FORM
$('#toggle-password-form').on('click', (e) => {
  const $this = $(e.target);
  const $next = $this.next();
  $this.toggleClass('hidden');
  $next.toggleClass('hidden');
});

// ENCRYPT PASSWORD
$('.user-form').on('submit', () => {
  const pass = $('#tb-password').val();
  const passRepeat = $('#tb-password-repeat').val();
  $('#tb-password-secure').val(sha1(pass));
  $('#tb-password-repeat-secure').val(sha1(passRepeat));
});
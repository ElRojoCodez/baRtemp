(() => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(values.weekday);
  const minutes = Number(values.hour) * 60 + Number(values.minute);
  // Tue–Sat 5 PM through 2 AM, including the after-midnight portion of Wed–Sun.
  const open = (day >= 2 && day <= 6 && minutes >= 17 * 60) ||
    ((day >= 3 || day === 0) && minutes < 2 * 60);

  document.querySelectorAll('[data-open-status]').forEach((element) => {
    const copy = element.querySelector('.status-copy');
    if (!copy) return;
    copy.textContent = open ? 'Open now · until 2 AM' : 'Closed now · Tue–Sat from 5 PM';
    element.classList.toggle('is-closed', !open);
  });
  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
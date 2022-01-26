'use strict'

/**
 * 翌日のトリガーをセットする関数
 */
function setTrigger() {
  const triggerName = 'runReminderScript';
  const trigger = new Trigger(triggerName);
  trigger.setTimesForTomorrow();
}

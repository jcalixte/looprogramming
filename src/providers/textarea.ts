export const handleWithTabs = (
  e: KeyboardEvent,
  textareaElement: HTMLTextAreaElement
) => {
  if (e.key == "Tab") {
    e.preventDefault()
    const start = textareaElement.selectionStart
    const end = textareaElement.selectionEnd

    textareaElement.value =
      textareaElement.value.substring(0, start) +
      "\t" +
      textareaElement.value.substring(end)

    textareaElement.selectionStart = textareaElement.selectionEnd = start + 1
  }
}

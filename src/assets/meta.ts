export const metadata = [
  {
    "component": "NoticeComponent",
    "docs": "A fancy notice",
    "inputs": {
      "warning": {
        "doc": "Text for the warning",
        "default": "Foo",
        "type": "string"
      },
      "status": {},
      "message": {
        "doc": "Text for the message.\nThis can be fun.",
        "type": "MessageType"
      }
    },
    "outputs": {
      "changed": {
        "doc": "Notice button was clicked.",
        "type": "ChangeEvent"
      },
      "happened": {}
    }
  }
]
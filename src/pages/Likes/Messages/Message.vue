<template>
  <div class="chat-message" :class="toMe ? 'left' : 'right'">
    <img v-show="toMe" :src="fromUser.thumbnailUrl" alt="送信者の画像">

    <div class="chat-item">
      <pre>{{ message.body }}</pre>
      <div class="text-right">
        <span v-show="isNew && toMe" class="badge badge-success">New</span>
        <small>{{ created }}</small>
      </div>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format'
import jaLocale from 'date-fns/locale/ja'

export default {
  name: 'message_message',
  props: {
    fromUser: Object,
    message: Object,
    startOfYear: Date,
    startOfDay: Date
  },
  computed: {
    loginUser () {
      return this.$store.state.loginUser
    },
    toMe () {
      return this.loginUser.id === this.message.to_id
    },
    isNew () {
      return this.message.read_at === null
    },
    created () {
      let formatStr
      const created = new Date(Date.parse(this.message.created))
      if (created >= this.startOfDay) {
        formatStr = 'HH:mm'
      } else if (created >= this.startOfYear) {
        formatStr = 'MM月DD日(dd)'
      } else {
        formatStr = 'YYYY年MM月DD日(dd)'
      }
      return format(this.message.created, formatStr, {locale: jaLocale})
    }
  }
}
</script>

<style scoped>
  .chat-message {
    margin-bottom: 10px;
  }
  .chat-message:after {
    /* clearfix */
    content: "";
    display: block;
    clear: both;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  .left img {
    float: left;
  }
  .right img {
    float: right;
  }
  .chat-item {
    padding: 5px 10px;
    border-radius: 10px;
    position: relative;
    margin-left: 55px;
  }
  .left .chat-item {
    background: rgba(39,170,225, .1);
  }
  .right .chat-item {
    background: rgba(141,198,63, .1);
  }
  .left .chat-item::before {
    border-bottom: 8px solid transparent;
    border-right: 8px solid rgba(39,170,255, .1);
    border-top: 8px solid transparent;
    content: "";
    height: 0;
    left: -8px;
    position: absolute;
    top: 12px;
    width: 0;
  }
  .right .chat-item::after {
    border-bottom: 8px solid transparent;
    border-left: 8px solid rgba(141,198,63, .1);
    border-top: 8px solid transparent;
    content: "";
    height: 0;
    right: -8px;
    position: absolute;
    top: 12px;
    width: 0;
  }
  .chat-item, .chat-item pre {
    font-size: 14px;
  }
  .chat-item pre {
    margin: 5px 0;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  @media (min-width:768px) {
    .chat-message {
      margin-bottom: 20px;
    }
    img {
      width: 65px;
    }
    .left .chat-item {
      margin-left: 85px;
    }
    .right .chat-item {
      margin-right: 85px;
    }
    .left .chat-item::before {
      border-bottom: 10px solid transparent;
      border-right: 10px solid rgba(141,198,63, .1);
      border-top: 10px solid transparent;
      left: -10px;
      top: 20px;
    }
    .right .chat-item::after {
      border-bottom: 10px solid transparent;
      border-left: 10px solid rgba(39,170,255, .1);
      border-top: 10px solid transparent;
      right: -10px;
      top: 20px;
    }
    .chat-item {
      padding: 10px 20px;
    }
    /*
    .chat-item-header h4 {
      font-size: 28px;
      margin: 10px 0;
    }
    */
    .chat-item, .chat-item pre {
      font-size: 22px;
    }
  }
</style>

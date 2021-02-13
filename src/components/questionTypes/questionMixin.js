import {mapGetters} from "vuex";

export default {
    props: {
        question: {
            type: Object,
            required: true
        },
        gameID: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            disabled: false,
            answerSelected: null
        }
    },
    computed: {
        ...mapGetters(['socket']),
    },
    methods: {
        answer(answer) {
            this.answerSelected = answer;
            this.disabled = true;
            this.socket.emit("answer", {
                gameID: this.gameID, answer
            });
        }
    },
};

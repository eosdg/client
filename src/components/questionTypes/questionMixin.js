import {mapGetters} from "vuex";

export default {
    props: {
        question: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapGetters(['socket']),
    }
};

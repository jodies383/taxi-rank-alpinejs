document.addEventListener('alpine:init', () => {
    Alpine.data('taxi', () => ({

        errorMessage: false,
        successMessage: false,
        dailyProfit: Alpine.$persist(0),
        destination: '',
        fare: '',
        taxis: '',

        rank: Alpine.$persist([{
            destination: 'Makhaza',
            queue: 12,
            departedTaxis: 0,
            taxiFare: 12.00,
            totalFare: 0,
            availTaxis: 5
        },
        {
            destination: 'Belhar',
            queue: 34,
            departedTaxis: 0,
            taxiFare: 18.50,
            totalFare: 0,
            availTaxis: 5
        },
        {
            destination: 'Bellville',
            queue: 23,
            departedTaxis: 0,
            taxiFare: 20.00,
            totalFare: 0,
            availTaxis: 5
        }]),

        increment() {
            this.taxi.queue++
        },

        decrement() {
            if (this.taxi.queue >= 1) { this.taxi.queue-- }
        },

        departTaxi() {
            if (this.taxi.queue >= 12 && this.taxi.availTaxis > 0) {
                this.taxi.queue -= 12, this.taxi.departedTaxis++,
                    this.taxi.totalFare += (this.taxi.taxiFare * 12),
                    this.dailyProfit += this.taxi.totalFare,
                    this.taxi.availTaxis--,
                    this.successMessage = true,
                    this.$refs.successMessage.innerText = 'taxi has successfully departed'
            } else if (this.taxi.queue < 12) {
                this.$refs.errorMessage.innerText = 'taxi needs at least 12 passengers to depart',
                    this.errorMessage = true;
                setTimeout(() => { this.errorMessage = false }, 2000)
            } else if (this.taxi.availTaxis <= 0) {
                this.$refs.errorMessage.innerText = 'there are currently no taxis available', 
                this.errorMessage = true
            }
            setTimeout(() => { this.successMessage = false }, 2000);
            setTimeout(() => { this.errorMessage = false }, 2000);
        },

        addATaxi() {
            this.taxi.availTaxis++;
            this.$refs.successMessage.innerText = 'taxi added';
            this.successMessage = true;
            setTimeout(() => { this.successMessage = false }, 2000)
        },

        addDestination() {
            let numRegex = /^[0-9][0-9]?$|^100$/
            let lettersRegex = /^[A-Za-z\s]+$/
            const duplicate = (arr, val) => {
                return arr.some(function (arrVal) {
                    return val === arrVal.destination;
                });
            }
            if (lettersRegex.test(this.destination) && numRegex.test(this.fare) && numRegex.test(this.taxis) && duplicate(this.rank, this.destination) === false) {
                this.rank.push({
                    destination: this.destination,
                    queue: 0,
                    departedTaxis: 0,
                    taxiFare: this.fare,
                    totalFare: 0,
                    availTaxis: this.taxis
                });
                this.errorMessage = false,
                    this.successMessage = true;
                this.$refs.successMessage.innerText = 'destination added'
            };
            setTimeout(() => { this.successMessage = false }, 2000);
            setTimeout(() => { this.errorMessage = false }, 2000);
            if (!this.destination) {
                this.errorMessage = true, this.$refs.errorMessage.innerText = 'missing destination name'
            } else if (!this.fare) {
                this.errorMessage = true, this.$refs.errorMessage.innerText = 'no fare added'
            } else if (!this.taxis) {
                this.errorMessage = true, this.$refs.errorMessage.innerText = 'no available taxis added'
            } 
            if (duplicate(this.rank, this.destination) === true) {
                this.errorMessage = true, this.$refs.errorMessage.innerText = 'this destination already exists'
            } else if (duplicate(this.rank, this.destination) === false) {
            this.errorMessage = false
        };
        }
    }))
})
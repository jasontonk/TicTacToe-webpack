import Datastore from 'nedb'

const app = new DataController();

export default class DataController {
    constructor(){
        this.database = new Datastore('database.db')
        this.database.loadDatabase();
        document.getElementById('save').addEventListener('click', () => this.insertGameData())
    }

    insertGameData() {
        console.log('i do get here')
        let winner = this.getWinner();
        let values = this.getValues();

        const fullDate = Date();
        this.database.insert({Winner: winner, Values: values.toJSON(),Date: fullDate})
    }

    getValues(){
        let values = []
        for (let i = 0; i < 9; i++){
            values[i] = document.getElementById('b'.concat((i+1))).value
        }
        return values
    }
    getWinner(){
        let counter = 0;

        //count empty spaces
        this.getValues().forEach(value => {
            if(value === ''){
                counter++;
            }
        })

        //check if any space left
        if (counter !== 0) {
            //check for horizontal win player X
            if ((values[0] === 'X' && values[1] === 'X' && values[2] === 'X') ||
                (values[3] === 'X' && values[4] === 'X' && values[5] === 'X') ||
                (values[6] === 'X' && values[7] === 'X' && values[8] === 'X')) {

                return 'X';

                //check for vertical win player X
            } else if ((values[0] === 'X' && values[3] === 'X' && values[6] === 'X') ||
                (values[1] === 'X' && values[4] === 'X' && values[7] === 'X') ||
                (values[2] === 'X' && values[5] === 'X' && values[8] === 'X')) {

                return 'X';

                //check for diagonal win player X
            } else if ((values[0] === 'X' && values[4] === 'X' && values[8] === 'X') ||
                (values[2] === 'X' && values[4] === 'X' && values[6] === 'X')) {

                return 'X';

                //check for horizontal win player Y
            } else if ((values[0] === 'Y' && values[1] === 'Y' && values[2] === 'Y') ||
                (values[3] === 'Y' && values[4] === 'Y' && values[5] === 'Y') ||
                (values[6] === 'Y' && values[7] === 'Y' && values[8] === 'Y')) {

                return 'X';

                //check for vertical win player Y
            } else if ((values[0] === 'Y' && values[3] === 'Y' && values[6] === 'Y') ||
                (values[1] === 'Y' && values[4] === 'Y' && values[7] === 'Y') ||
                (values[2] === 'Y' && values[5] === 'Y' && values[8] === 'Y')) {

                return 'X';

                //check for diagonal win player Y
            } else if ((values[0] === 'Y' && values[4] === 'Y' && values[8] === 'Y') ||
                (values[2] === 'Y' && values[4] === 'Y' && values[6] === 'Y')) {

                return 'X';
            }
        }
        else{
            return 'Tie';
        }
    }
}



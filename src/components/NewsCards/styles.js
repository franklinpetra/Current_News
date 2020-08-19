import { makeStyles } from '@material-ui/core/styles';


export default makeStyles({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        height: '45vh',
        padding: '10%',
        borderRadius: 10,
        color: 'white',
        fontSize:".40em",
        },

    infoCard: {
        display: 'flex', 
        flexDirection: 'column', 
        textAlign: 'center',
    },

    container: {
        padding: '0 5%', 
        width: '100%', 
    },
});
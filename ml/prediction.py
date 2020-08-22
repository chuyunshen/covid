import pandas as pd 
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.layers import Conv1D, Flatten, Dense, Input, concatenate, Masking, LSTM, TimeDistributed
from tensorflow.keras import regularizers 
from tensorflow.keras import initializers

# currently available models: california 

def online_train(model_name, active, new):
    """
    train the model on a new batch of samples
    
    model_name, string: state ex. 'california'
    active, numpy array: in shape (samples), the number of days with data provided 
    new, numpy array: in shape (samples), same as before with new cases 
    
    returns:
    None   
    """
    X, Y, _ = prelims(model_name, active, new)
    
    model = tf.keras.models.load_model(model_name+'.keras')
    model.fit([X], Y, verbose=0, epochs=3, shuffle=False, batch_size=1)
    model.save(model_name.keras)
    return 

def get_predictions(model_name, active, new):
    """
    train the model on a new batch of samples
    
    model_name, string: state ex. 'california'
    active, numpy array: in shape (samples), the number of days with data provided 
    new, numpy array: in shape (samples), same as before with new cases 
    
    returns: 
    preds, numpy array: in shape (samples-timestep+1, 2). preds[:,0] contains the predicted active cases, preds[:,1] contains the predicted new cases
    """
    
    X, _, Max = prelims(model_name, active, new)
    
    model = tf.keras.models.load_model(model_name+'.keras')
    preds = model.predict([X])*Max
    return preds 
    
    
    
def prelims(model_name, active, new):
    df = pd.read_csv(model_name+'.csv', sep=',', header=None)
    active0, new0 = np.array(df[1]), np.array(df[2])
    ac_new = np.stack([active0, new0], axis=1)
    Max = np.max(ac_new, axis=0)
    
    timestep = 14
    
    ac_new0 = np.stack([active, new], axis=1)/Max
    Xorig = []
    window = np.arange(0, timestep)

    for i in range(active.size - timestep-1):
        day = ac_new0[window+i]
        Xorig.append(day)
    X = np.stack(Xorig)
    Y = ac_new0[timestep+1:]
    return X, Y, Max



import pandas as pd 
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.layers import Conv1D, Flatten, Dense, Input, concatenate, Masking, LSTM, TimeDistributed
from tensorflow.keras import regularizers 
from tensorflow.keras import initializers
from datetime import datetime, timedelta

def update_predbatch(model_name, active, new): 
    future_window = 7 
    dates = np.array([int((datetime.today()+timedelta(days=n)).strftime('%m%d%Y')) for n in range(future_window)])
    # online_train(model_name, active, new)
    
    active1, new1 = active[0:0+14], new[0:0+14]
    
    for i in range(0,future_window): 
        active2, new2 = active1[i:i+14], new1[i:i+14]
        preds = get_predictions(model_name, active2, new2)
        active1 = np.append(active1,preds[0,0])
        new1 = np.append(new1,preds[0,1])
    active1, new1 = active1[-future_window:], new1[-future_window:]
    
    Ysave = np.stack([dates, active1, new1],axis=1).astype('int')
    pd.DataFrame(Ysave).to_csv('./Prediction/'+model_name+'.csv', header=False)
    
    p = Ysave[:,2]/Ysave[:,1]
    n = 8
    Ybatch = [dates]
    for i in range(n):
        b = -np.log(2)/np.log(1-p*2**i)
        Ybatch.append(b)
    Ybatch = np.stack(Ybatch,axis=1).astype('int')
    
    pd.DataFrame(Ybatch).to_csv('./Batch/'+model_name+'.csv', header=False)
    return 

    
    
def online_train(model_name, active, new):
    """
    train the model on a new batch of samples
    
    model_name, string: state ex. 'california'
    active, numpy array: in shape (samples), the number of days with data provided (must be at least 14), the active cases 
    new, numpy array: in shape (samples), same as before with new cases 
    
    returns:
    None   
    """
    X, Y, _ = prelims(model_name, active, new)
    
    model = tf.keras.models.load_model('ml/models/'+model_name+'.keras')
    model.fit([X], Y, verbose=0, epochs=1, shuffle=False, batch_size=1)
    model.save('ml/models/'+model_name+'.keras')
    return 

def get_predictions(model_name, active, new):
    """
    returns the predictions of the active and new cases from a 14 day window
    
    model_name, string: state ex. 'california'
    active, numpy array: in shape (samples), the number of days with data provided (must be at least 14), the active cases 
    new, numpy array: in shape (samples), same as before with new cases 
    
    returns: 
    preds, numpy array: in shape (samples-timestep+1, 2). preds[:,0] contains the predicted active cases, preds[:,1] contains the predicted new cases
    """
    
    X, Max = prelims1(model_name, active, new)
    X = X.reshape((1, X.shape[0], X.shape[1]))
    model = tf.keras.models.load_model('ml/models/'+model_name+'.keras')
    preds = model.predict([X])*Max
    return preds 

def prelims(model_name, active, new):
    df = pd.read_csv('Webapp/Data/'+model_name+'.csv', sep=',', header=None)
    active0, new0 = np.array(df[1]), np.array(df[2])
    ac_new = np.stack([active0, new0], axis=1)
    Max = np.max(ac_new[0:130,:], axis=0)
    
    timestep = 14
    
    ac_new0 = np.stack([active, new], axis=1)/Max
    Xorig = []
    window = np.arange(0, timestep)

    for i in range(active.size - timestep):
        day = ac_new0[window+i]
        Xorig.append(day)
    X = np.stack(Xorig)
    Y = ac_new0[timestep:]
    return X, Y, Max

def prelims1(model_name, active, new):
    df = pd.read_csv('Webapp/Data/'+model_name+'.csv', sep=',', header=None)
    active0, new0 = np.array(df[1]), np.array(df[2])
    ac_new = np.stack([active0, new0], axis=1)
    Max = np.max(ac_new[0:130,:], axis=0)
    
    timestep = 14
    
    ac_new0 = np.stack([active, new], axis=1)/Max
    X = ac_new0
    return X, Max


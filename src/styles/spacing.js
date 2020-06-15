import {Platform} from 'react-native';

export const basePadding = {
    padding: 15,
};

export const pb0 = {
    paddingBottom: 0,
};

export const pb15 = {
    paddingBottom: 15,
};

export const pb40 = {
    paddingBottom: 40,
};

export const pt15 = {
    paddingTop: 15,
};

export const pt40platform = {
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
};

export const mt15 = {
    marginTop: 15,
};

export const mb7 = {
    marginBottom: 7,
};

export const mb40neg = {
    marginBottom: -40,
};

export const mt40neg = {
    marginTop: -40,
};

export const row = {
    flexDirection: 'row',
    alignItems: 'flex-end',
};

export const rowSpacedBetween = {
    ...row,
    justifyContent: 'space-between',
};

export const column = {
    justifyContent: 'flex-end',
    flexDirection: 'column',
};

export const smallHeader = {
    height: 150,
};

export const bigHeader = {
    height: 300,
};

export const bigRounded = {
    borderRadius: 40,
};

export const mediumRounded = {
    borderRadius: 15,
};

export const smallRounded = {
    borderRadius: 5,
};

export const flexArea = {
    flex: 1,
};

export const fullHeight = {
    height: '100%',
};

export const halfHeight = {
    height: '50%',
};

export const fullWidth = {
    width: '100%',
};

export const mediumHeight = {
    maxHeight: 150,
};

export const mediumImage = {
    width: 200,
    height: 200,
};

export const itemsCenter = {
    alignItems: 'center',
};

export const center = {
    alignContent: 'center',
    justifyContent: 'center',
    ...itemsCenter,
};

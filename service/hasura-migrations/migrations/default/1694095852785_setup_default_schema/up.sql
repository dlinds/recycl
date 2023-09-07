SET check_function_bodies = false;
CREATE TABLE public.items (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    "isRecyclable" boolean NOT NULL,
    "alternativeUses" text[] NOT NULL,
    state text
);
ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);

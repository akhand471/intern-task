--
-- PostgreSQL database dump
--

\restrict kSho6M3SEyTXphEU9jQ7g1DgH3urmcpZ3nmPNyQtwPpFhchZLsXvc7veAVqLDgT

-- Dumped from database version 14.22 (Homebrew)
-- Dumped by pg_dump version 14.22 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: akhand
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.auth_user OWNER TO akhand;

--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: akhand
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO akhand;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: akhand
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: akhand
--

CREATE TABLE public.migrations (
    id bigint NOT NULL,
    version character varying(255) NOT NULL,
    class character varying(255) NOT NULL,
    "group" character varying(255) NOT NULL,
    namespace character varying(255) NOT NULL,
    "time" integer NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO akhand;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: akhand
--

CREATE SEQUENCE public.migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO akhand;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: akhand
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: teachers; Type: TABLE; Schema: public; Owner: akhand
--

CREATE TABLE public.teachers (
    id integer NOT NULL,
    user_id integer NOT NULL,
    university_name character varying(100) NOT NULL,
    gender character varying(10) NOT NULL,
    year_joined integer NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.teachers OWNER TO akhand;

--
-- Name: teachers_id_seq; Type: SEQUENCE; Schema: public; Owner: akhand
--

CREATE SEQUENCE public.teachers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teachers_id_seq OWNER TO akhand;

--
-- Name: teachers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: akhand
--

ALTER SEQUENCE public.teachers_id_seq OWNED BY public.teachers.id;


--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: akhand
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: akhand
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: teachers id; Type: DEFAULT; Schema: public; Owner: akhand
--

ALTER TABLE ONLY public.teachers ALTER COLUMN id SET DEFAULT nextval('public.teachers_id_seq'::regclass);


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: akhand
--

COPY public.auth_user (id, email, first_name, last_name, password, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: akhand
--

COPY public.migrations (id, version, class, "group", namespace, "time", batch) FROM stdin;
1	2026-03-26-171644	App\\Database\\Migrations\\CreateAuthUserTable	default	App	1774545546	1
2	2026-03-26-171644	App\\Database\\Migrations\\CreateTeachersTable	default	App	1774545546	1
\.


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: akhand
--

COPY public.teachers (id, user_id, university_name, gender, year_joined, created_at, updated_at) FROM stdin;
\.


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: akhand
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: akhand
--

SELECT pg_catalog.setval('public.migrations_id_seq', 2, true);


--
-- Name: teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: akhand
--

SELECT pg_catalog.setval('public.teachers_id_seq', 1, false);


--
-- Name: auth_user auth_user_email_key; Type: CONSTRAINT; Schema: public; Owner: akhand
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_email_key UNIQUE (email);


--
-- Name: auth_user pk_auth_user; Type: CONSTRAINT; Schema: public; Owner: akhand
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT pk_auth_user PRIMARY KEY (id);


--
-- Name: migrations pk_migrations; Type: CONSTRAINT; Schema: public; Owner: akhand
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT pk_migrations PRIMARY KEY (id);


--
-- Name: teachers pk_teachers; Type: CONSTRAINT; Schema: public; Owner: akhand
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT pk_teachers PRIMARY KEY (id);


--
-- Name: teachers teachers_user_id_key; Type: CONSTRAINT; Schema: public; Owner: akhand
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_user_id_key UNIQUE (user_id);


--
-- Name: teachers teachers_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: akhand
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.auth_user(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict kSho6M3SEyTXphEU9jQ7g1DgH3urmcpZ3nmPNyQtwPpFhchZLsXvc7veAVqLDgT

